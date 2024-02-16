import socketio
import psutil
import time
import pandas as pd


# ? Extract running processes data
def monitor_running_processes():
    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'create_time']):
        processes.append({
            'pid': proc.info['pid'],
            'name': proc.info['name'],
            'create_time': time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(proc.info['create_time']))
        })
    return processes


# ? Preprocess Extracted Data
def preprocess_data(processes):
    df = pd.DataFrame(processes)
    df['create_time'] = pd.to_datetime(df['create_time'])
    df['running_time'] = pd.Timestamp.now() - df['create_time']
    return df.to_dict(orient='records')


# ? Transmitting Preprocessed Data
def transmit_processed_data():
    processes = monitor_running_processes()
    processed_data = preprocess_data(processes)
    socketio.emit('processes_data', processed_data)