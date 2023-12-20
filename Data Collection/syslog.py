import socketio
import win32evtlog
import psutil
import winreg
import pynetstat
import datetime
import re
import pandas as pd


def get_user_logs():
    security_log = win32evtlog.OpenEventLog(None, "Security")
    system_log = win32evtlog.OpenEventLog(None, "System")

    login_events = win32evtlog.ReadEventLog(security_log, None, 4625)
    data_access_events = win32evtlog.ReadEventLog(security_log, None, 4656)
    privilege_events = win32evtlog.ReadEventLog(system_log, None, 4672)

    user_activity_data = []
    for event in login_events:
        user_activity_data.append({
            "timestamp": datetime.datetime.fromtimestamp(event.TimeGenerated / 10000000),
            "user": event.UserName,
            "event_type": "Login",
            "details": event.MessageData
        })

    for event in data_access_events:
        user_activity_data.append({
            "timestamp": datetime.datetime.fromtimestamp(event.TimeGenerated / 10000000),
            "user": event.SubjectUser,
            "event_type": "DataAccess",
            "details": event.ObjectName
        })

    for event in privilege_events:
        user_activity_data.append({
            "timestamp": datetime.datetime.fromtimestamp(event.TimeGenerated / 10000000),
            "user": event.SubjectUser,
            "event_type": "Privilege Change",
            "details": event.MessageData
        })

    win32evtlog.CloseEventLog(security_log)
    win32evtlog.CloseEventLog(system_log)

    return user_activity_data


def get_system_logs():
    registry_key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"SYSTEM\CurrentControlSet\Control\Session Manager", 0)
    last_boot = winreg.QueryValueEx(registry_key, "BootCount")[0]
    winreg.CloseKey(registry_key)

    running_processes = psutil.process_iter()
    process_data = []
    for process in running_processes:
        process_data.append({
            "name": process.name(),
            "pid": process.pid,
            "cpu": process.cpu_percent(),
            "memory": process.memory_percent()
        })

    registry_key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall", 0)
    installed_apps = []
    for i in range(winreg.QueryInfoKey(registry_key)[0]):
        app_name = winreg.EnumKey(registry_key, i)
        installed_apps.append(app_name)
    winreg.CloseKey(registry_key)

    return {
        "last_boot": datetime.datetime.fromtimestamp(last_boot),
        "running_processes": process_data,
        "installed_apps": installed_apps
    }


# Data preprocessing
def preprocess_syslog_data(raw_data, processed_data=None):
    preprocessed_data = []
    for log_line in raw_data:
        match = re.search(r'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (\w+) (.*)', log_line)
        if match:
            timestamp = match.group(1)
            level = match.group(2)
            message = match.group(3)
            preprocessed_data.append({'timestamp': timestamp, 'level': level, 'message': message})

    df = pd.DataFrame(processed_data)
    df['timestamp'] = pd.to_datetime(df['timestamp'])

    return df.to_json()


# Transmit collected data in real-time
@socketio.on('collect_syslog_data')
def handle_syslog_data():
    raw_data = get_system_logs(), get_user_logs()
    processed_data = preprocess_syslog_data(raw_data)
    socketio.emit('log_data_update', processed_data)
