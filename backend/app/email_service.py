import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "handpowercleaningservice@gmail.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "") # Gmail 16-character App Password
ADMIN_NOTIFICATION_EMAIL = os.getenv("ADMIN_NOTIFICATION_EMAIL", "handpowercleaningservice@gmail.com")

def send_booking_email_notification(booking_data: dict):
    """
    Sends an automated email notification to the business owner and customer.
    Runs asynchronously via FastAPI BackgroundTasks.
    """
    # If SMTP_PASSWORD is not yet configured, log notification info and return safely
    if not SMTP_PASSWORD:
        print(f"📧 [Email Alert]: New booking from {booking_data.get('name')} ({booking_data.get('phone')}). Configure SMTP_PASSWORD in backend/.env to send live Gmail messages.")
        return False

    try:
        # 1. Prepare Admin Notification Email
        msg_admin = MIMEMultipart("alternative")
        msg_admin["Subject"] = f"🔔 New Cleaning Booking: {booking_data.get('name')} - {booking_data.get('service_type')}"
        msg_admin["From"] = f"Hand Power Cleaning Service <{SMTP_USERNAME}>"
        msg_admin["To"] = ADMIN_NOTIFICATION_EMAIL

        html_admin_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E293B; margin: 0; padding: 20px; background-color: #F8FAFC;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #E2E8F0; padding: 25px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="border-bottom: 2px solid #25A244; padding-bottom: 12px; margin-bottom: 20px;">
                    <h2 style="color: #0B2545; margin: 0;">🧹 Hand Power Cleaning Service</h2>
                    <p style="color: #25A244; font-weight: bold; margin: 4px 0 0 0;">New Appointment Booking Received</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr style="border-bottom: 1px solid #F1F5F9;">
                        <td style="padding: 10px 0; font-weight: bold; color: #64748B; width: 35%;">Customer Name:</td>
                        <td style="padding: 10px 0; font-weight: bold; color: #0B2545;">{booking_data.get('name')}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #F1F5F9;">
                        <td style="padding: 10px 0; font-weight: bold; color: #64748B;">Phone Number:</td>
                        <td style="padding: 10px 0; font-weight: bold; color: #0B2545;">
                            <a href="tel:{booking_data.get('phone')}" style="color: #0B2545; text-decoration: none;">{booking_data.get('phone')}</a>
                        </td>
                    </tr>
                    <tr style="border-bottom: 1px solid #F1F5F9;">
                        <td style="padding: 10px 0; font-weight: bold; color: #64748B;">Service Requested:</td>
                        <td style="padding: 10px 0; color: #25A244; font-weight: bold;">{booking_data.get('service_type')}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #F1F5F9;">
                        <td style="padding: 10px 0; font-weight: bold; color: #64748B;">Location:</td>
                        <td style="padding: 10px 0;">{booking_data.get('location', 'Coimbatore')}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #F1F5F9;">
                        <td style="padding: 10px 0; font-weight: bold; color: #64748B;">Preferred Date:</td>
                        <td style="padding: 10px 0;">{booking_data.get('preferred_date', 'As soon as possible')}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #F1F5F9;">
                        <td style="padding: 10px 0; font-weight: bold; color: #64748B;">Customer Email:</td>
                        <td style="padding: 10px 0;">{booking_data.get('email', 'Not provided')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; font-weight: bold; color: #64748B; vertical-align: top;">Notes / Message:</td>
                        <td style="padding: 10px 0; font-style: italic;">{booking_data.get('message', 'None')}</td>
                    </tr>
                </table>

                <div style="text-align: center; margin-top: 25px;">
                    <a href="https://wa.me/91{booking_data.get('phone')}?text=Hi%20{booking_data.get('name')},%20thank%20you%20for%20contacting%20Hand%20Power%20Cleaning%20Service%20in%20Coimbatore!%20We%20received%20your%20booking%20for%20{booking_data.get('service_type')}." 
                       style="background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; display: inline-block;">
                       💬 Chat with Customer on WhatsApp
                    </a>
                </div>
            </div>
        </body>
        </html>
        """
        msg_admin.attach(MIMEText(html_admin_content, "html"))

        # Connect to SMTP Server
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(SMTP_USERNAME, ADMIN_NOTIFICATION_EMAIL, msg_admin.as_string())

        # 2. If Customer Provided Email, Send Instant Confirmation Email to Customer
        customer_email = booking_data.get("email")
        if customer_email and "@" in customer_email:
            msg_cust = MIMEMultipart("alternative")
            msg_cust["Subject"] = "✅ Booking Received - Hand Power Cleaning Service Coimbatore"
            msg_cust["From"] = f"Hand Power Cleaning Service <{SMTP_USERNAME}>"
            msg_cust["To"] = customer_email

            html_cust_content = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E293B; margin: 0; padding: 20px; background-color: #F8FAFC;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #E2E8F0; padding: 25px;">
                    <div style="border-bottom: 2px solid #25A244; padding-bottom: 12px; margin-bottom: 20px;">
                        <h2 style="color: #0B2545; margin: 0;">Hand Power Cleaning Service</h2>
                        <p style="color: #25A244; font-weight: bold; margin: 4px 0 0 0;">Clean Hands. Clean Space. Better Life.</p>
                    </div>

                    <p>Dear <strong>{booking_data.get('name')}</strong>,</p>
                    <p>Thank you for choosing Hand Power Cleaning Service! We have received your appointment request for <strong>{booking_data.get('service_type')}</strong>.</p>
                    
                    <div style="background-color: #F1F5F9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 4px 0;"><strong>Service:</strong> {booking_data.get('service_type')}</p>
                        <p style="margin: 4px 0;"><strong>Location:</strong> {booking_data.get('location', 'Coimbatore')}</p>
                        <p style="margin: 4px 0;"><strong>Preferred Date:</strong> {booking_data.get('preferred_date', 'Asap')}</p>
                    </div>

                    <p>Our team will call you at <strong>{booking_data.get('phone')}</strong> shortly to confirm your service slot.</p>
                    <p>Need urgent assistance? Call our direct helpline: <a href="tel:9342401538" style="color: #25A244; font-weight: bold;">+91 9342401538</a></p>
                </div>
            </body>
            </html>
            """
            msg_cust.attach(MIMEText(html_cust_content, "html"))
            server.sendmail(SMTP_USERNAME, customer_email, msg_cust.as_string())

        server.quit()
        print(f"✅ Email successfully dispatched for booking ID: {booking_data.get('name')}")
        return True
    except Exception as e:
        print(f"⚠️ Email dispatch error (Non-blocking): {str(e)}")
        return False
