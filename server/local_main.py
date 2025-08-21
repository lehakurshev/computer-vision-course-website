import gspread

scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

creds = gspread.service_account("auth.json", scope)

wks = creds.open("computer-vision-course-website-paid-payments-descriptions").sheet1

all_values = wks.get_all_values()

last_row = len(all_values)

new_data = [1, 2]
wks.insert_row(new_data, last_row + 1)