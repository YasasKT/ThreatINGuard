import socketio
import psutil
import wmi
import datetime
import threading


def get_file_permissions():
    previous_permissions = {}

    while True:
        for path in "C:":
            current_permissions = psutil.disk_usage(path).st_mode
            if path not in previous_permissions or current_permissions != previous_permissions[path]:
                file_event = {
                    "timestamp": datetime.datetime.now(),
                    "path": path,
                    "old_permissions": previous_permissions.get(path),
                    "new_permissions": current_permissions
                }
                socketio.emit("file_permission_event", file_event)
                previous_permissions[path] = current_permissions


def get_file_audit_logs():
    c = wmi.WMI()
    logs = c.Win32_NTLogEvent(LogFile='Security', EventType=4713)
    file_audit_events = []
    for log in logs:
        file_audit_events.append({
            "timestamp": log.TimeGenerated,
            "user": log.User,
            "event_id": log.EventCode,
            "message": log.Message
        })
    return file_audit_events


socketio.on('collect_file_data')


def handle_file_data():
    thread = threading.Thread(target=get_file_permissions)
    thread.start()

    file_audit_logs = get_file_audit_logs()
    processed_data = {
        "file_permission_events": [],
        "file_audit_logs": file_audit_logs
    }
    socketio.emit('preprocessed_file_data_update', processed_data)
