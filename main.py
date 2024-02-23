from flask import Flask, render_template
from flask import Flask, request, jsonify, session, redirect

app = Flask(__name__)
app.secret_key = 'beyond-charity'

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')
@app.route('/contact')
def contact():
    return render_template('contact.html')
@app.route('/service')
def service():
    return render_template('service.html')
@app.route('/auth')
def auth():
    return render_template('auth.html')
@app.route('/login')
def login():
    return render_template('login.html')
@app.route('/food-service')
def fd():
    return render_template('food-service.html')

@app.route('/clothes')
def cs():
    return render_template('clothes.html')
@app.route('/edu')
def edu():
    return render_template('edu.html')
@app.route('/fr')
def fr():
    return render_template('fr.html')
@app.route('/misc')
def misc():
    return render_template('misc.html')
@app.route('/add-event')
def event():
    return render_template('add-event.html')
@app.route('/ongoing-events')
def ongoingevent():
    return render_template('ongoing-events.html')
@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html')
@app.route('/patners')
def patners():
    return render_template('patners.html')
@app.route('/impactmeasurement')
def impactmeasurement():
    return render_template('impactmeasurement.html')


@app.route('/signin')
def signin():
    return render_template('signin.html')
@app.route('/My-events')
def myevents():
    return render_template('my-events.html')

@app.route('/loginsess', methods=['POST'])
def loginsess():
    data = request.json
    user_id = data['userId']
    isLoggedIn = data['isLoggedIn']
    userType=data['userType']

    # Set session variables for login status and user ID
    session['isLoggedIn'] = isLoggedIn
    session['user_id'] = user_id
    session['userType'] = userType

    # Process user login as needed (e.g., store user ID in database)

    return jsonify({'success': True})

@app.route('/logoutsess', methods=['GET'])
def logoutsess():
    # Clear session variables on logout
    session.pop('isLoggedIn', None)
    session.pop('user_id', None)
    session.pop('userType', None)

    # Perform any additional logout actions if needed

    return redirect('/index') 
    
@app.route('/signup')
def signup():
    return render_template('signup.html')

if __name__ == '__main__':
    app.run(debug=True)