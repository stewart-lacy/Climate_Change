from flask import Flask, redirect,url_for,render_template
from flask_bootstrap import Bootstrap
from subprocess import Popen
# 2. Create an app, being sure to pass __name__
app = Flask(__name__)
Bootstrap(app)
 

# 3. Define what to do when a user hits the index route
@app.route('/index.html')
@app.route('/')
def home():
    return render_template("index.html")
@app.route('/data.html')
def data():
    return render_template("data.html")
@app.route('/geomapping.html',methods=["GET","POST"])
def map():
    return render_template("geomapping.html")
@app.route('/visuals.html',methods=["GET","POST"])
def visuals():
    return render_template("visuals.html")
# 4. Define what to do when a user hits the /about route
##@app.route("/about")
##def about():
  ####return "Welcome to my 'About' page!"


if __name__ == "__main__":
    p = Popen(['python3 -m http.server'], shell=True)
    app.run(host='localhost', port=5000)
app.run(debug=True)