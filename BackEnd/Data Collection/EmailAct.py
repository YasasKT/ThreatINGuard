import socketio
import imaplib
import email
from email.header import decode_header


# ? Extract Email Activity Data
def monitor_email_events(server, username, password):
    emails = []

    # * Connect to the IMAP server
    imap = imaplib.IMAP4_SSL(server)
    imap.login(username, password)
    imap.select('INBOX')

    # * Search for Emails
    status, data = imap.search(None, 'ALL')

    if status == 'OK':
        for num in data[0].split():
            status, data = imap.fetch(num, '(RFC822)')
            if status == 'OK':
                msg = email.message_from_bytes(data[0][1])

                # * Email Details
                subject = decode_header(msg['Subject'])[0][0].decode('utf-8')
                sender = msg['From']
                recipient = msg['To']
                date = msg['Date']

                # * Email Body
                if msg.is_multipart():
                    for part in msg.walk():
                        content_type = part.get_content_type()
                        content_disposition = str(part.get("Content-Disposition"))

                        if "attachment" not in content_disposition:
                            body = part.get_payload(decode=True).decode()
                            break
                else:
                    body = msg.get_payload(decode=True).decode()

                emails.append({
                    'subject': subject,
                    'sender': sender,
                    'recipient': recipient,
                    'date': date,
                    'body': body
                })

    imap.logout()
    return emails


# ? Transmit Email Activities
def transmit_data():
    email_activities = monitor_email_events()
    socketio.emit('email_activities', email_activities)