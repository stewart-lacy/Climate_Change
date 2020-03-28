from flask import Flask, redirect,url_for,render_template
from flask_bootstrap import Bootstrap
# 2. Create an app, being sure to pass __name__
app = Flask(__name__)
Bootstrap(app)
 

# 3. Define what to do when a user hits the index route
@app.route('/')
def home():
    return render_template("index.html")


# 4. Define what to do when a user hits the /about route
##@app.route("/about")
##def about():
  ####return "Welcome to my 'About' page!"


if __name__ == "__main__":
    app.run(debug=True)