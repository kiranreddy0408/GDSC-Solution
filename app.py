from flask import Flask, render_template

app = Flask(__name__)
@app.route('/index')
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

if __name__ == '__main__':
    app.run(debug=True)