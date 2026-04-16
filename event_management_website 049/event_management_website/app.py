

from flask import Flask, render_template, request, redirect, flash

app = Flask(__name__)
app.secret_key = "secret"

# Sample Events Data
events = [
    {"name": "Tech Fest", "date": "10 April", "venue": "Auditorium"},
    {"name": "Music Night", "date": "15 April", "venue": "Ground"},
    {"name": "Hackathon", "date": "20 April", "venue": "Lab"},
    {"name": "Workshop", "date": "25 April", "venue": "Seminar Hall"}
]

# HOME PAGE
@app.route('/')
def home():
    return render_template('index.html', events=events)

# EVENTS PAGE
@app.route('/events')
def events_page():
    return render_template('events.html', events=events)

# REGISTER PAGE
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        event = request.form.get('event')
        tickets = request.form.get('tickets')

        print("Name:", name)
        print("Email:", email)
        print("Phone:", phone)
        print("Event:", event)
        print("Tickets:", tickets)

        flash("Registration Successful!")
        return redirect('/events')

    return render_template('register.html', events=events)

# ADMIN PANEL
@app.route('/admin')
def admin():
    return render_template('admin.html', events=events)

# ADD EVENT
@app.route('/admin/add', methods=['POST'])
def add_event():
    name = request.form.get('name')
    date = request.form.get('date')
    venue = request.form.get('venue')

    new_event = {
        "name": name,
        "date": date,
        "venue": venue
    }

    events.append(new_event)

    flash("Event Added Successfully!")
    return redirect('/admin')

# DELETE EVENT
@app.route('/admin/delete/<int:index>')
def delete_event(index):
    if index < len(events):
        events.pop(index)

    flash("Event Deleted Successfully!")
    return redirect('/admin')
@app.route('/admin/edit/<int:index>', methods=['GET', 'POST'])
def edit_event(index):
    if index >= len(events):
        return redirect('/admin')

    if request.method == 'POST':
        events[index]['name'] = request.form.get('name')
        events[index]['date'] = request.form.get('date')
        events[index]['venue'] = request.form.get('venue')

        flash("Event Updated Successfully!")
        return redirect('/admin')

    return render_template('edit.html', event=events[index], index=index)

# RUN APP
if __name__ == '__main__':
    app.run(debug=True)