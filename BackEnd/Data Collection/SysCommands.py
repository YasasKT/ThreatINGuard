import socketio
import subprocess
import re


# ? Extract System Commands Data
def monitor_system_commands():
    commands = []

    # * Execute /history Command in Windows
    try:
        output = subprocess.check_output(['doskey', '/history'], shell=True, universal_newlines=True)
        commands.extend(output.split('\n'))
    except subprocess.CalledProcessError:
        pass

    return commands


# ? Preprocess Extracted Data
def monitor_system_commands(commands):
    categorized_commands = {
        'File Operations': [],
        'File Execution': [],
        'System Management': [],
        'Network Management': [],
        'Other': []
    }

    for command in commands:
        if re.match(r'(?i)^(ls|dir|cd|mkdir|rm|cp|mv|rmdir)', command):
            categorized_commands['File Operations'].append(command)
        elif re.match(r'(?i)^(\.\$|\.\\|\.\\\.|~|/)', command):
            categorized_commands['File Execution'].append(command)
        elif re.match(r'(?i)^(ping|tracert|netstat|ipconfig)', command):
            categorized_commands['Network Management'].append(command)
        elif re.match(r'(?i)^(shutdown|schtasks|taskkill|tasklist|net user)', command):
            categorized_commands['System Management'].append(command)
        else:
            categorized_commands['Other'].append(command)
    return categorized_commands


# ? Transmit Processed Data
def transmit_processed_data():
    commands = monitor_system_commands()
    preprocessed_commands = monitor_system_commands(commands)
    socketio.emit('preprocessed_command_data', preprocessed_commands)