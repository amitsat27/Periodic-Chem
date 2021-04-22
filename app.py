from flask import Flask,render_template,request,json

app = Flask(__name__)

@app.route("/")
def landing1():
    return render_template("home.html")


@app.route("/home.html")
def landing2():
    return render_template("home.html")

@app.route("/complete_table.html")
def completetable():
    return render_template("complete_table.html")

@app.route("/electronicconfigprac.html",methods=["GET","POST"])
def electronpractice():
 
    return render_template("electronicconfigprac.html")

@app.route("/match.html")
def matchelements():
    return render_template("match.html")

@app.route("/mnuemonics_final.html")
def nemo():
    return render_template("mnuemonics_final.html")

@app.route("/news.html",methods=["GET"])
def news():
    
    return render_template("news.html")

@app.route("/videos.html")
def tutorials():
    return render_template("videos.html")

@app.route("/periodictable.html")
def periodictable():
    return render_template("periodictable.html")


if __name__=="__main__":
    app.run(debug=True)