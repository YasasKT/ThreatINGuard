import socketio
import win32evtlog
import pandas as pd
import win32evtlogutil


# ? Extract file access and modification event data
def monitor_file_events():
    events = []

    handle = win32evtlog.OpenEventLog(None, 'System')

    total_records = win32evtlog.GetNumberOfEventLogRecords(handle)

    event_types = [win32evtlog.EVENTLOG_INFORMATION_TYPE]

    while True:
        events_batch = win32evtlog.ReadEventLog(handle, win32evtlog.EVENTLOG_BACKWARDS_READ | win32evtlog.EVENTLOG_SEQUENTIAL_READ, 0)
        for event in events_batch:
            if event.EventType in event_types:
                message = win32evtlogutil.SafeFormatMessage(event, 'System')
                events.append({
                    'timestamp': event.TimeGenerated.Format(),
                    'event_type': 'File Access or Modification',
                    'message': message
                })
        if len(events) >= total_records:
            break

    win32evtlog.CloseEventLog(handle)

    return events


# ? Preprocess Data
def preprocess_data(events):
    df = pd.DataFrame(events)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['date'] = df['timestamp'].dt.date
    df['time'] = df['timestamp'].dt.time
    return df


# ? Transmitting Processed Data
def transmit_processed_data():
    events = monitor_file_events()
    processed_data = preprocess_data(events)
    socketio.emit('file_events_data', processed_data.to_dict(orient='records'))

