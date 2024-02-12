# ? Should Connect to a Database
import socketio
import os
import time
import pandas as pd

DOWNLOADS_FOLDER = os.path.join(os.path.expanduser("~"), "Downloads")


# Extract file downloads and transfers data
def monitor_file_transfers_and_downloads():
    while True:
        for filename in os.listdir(DOWNLOADS_FOLDER):
            if os.path.isfile(os.path.join(DOWNLOADS_FOLDER, filename)):
                action = 'Download'
                socketio.emit('file-transfer', {'action': action, 'filename': filename}, broadcast=True)


# Preprocess data
def preprocess_data():
    df = pd.read_csv(os.path.join(DOWNLOADS_FOLDER, ''))  # * Need to edit this after connecting the database
    df['timestamp'] = pd.to_datetime(['timestamp'])

    df['date'] = df['timestamp'].dt.date
    daily_counts = df.groupby(['date', 'action']).size().unstack(fill_value=0)

    return daily_counts


@socketio.on('connect')
def handle_connect():
    socketio.emit('message', {'data': 'Connected'})

