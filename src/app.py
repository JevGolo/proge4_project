from flask import Flask, redirect, render_template, request

app = Flask(__name__)

messages = {
    "empty_input" : "Palun sisestage andmed!"
}

@app.route("/")
def index():
    return redirect("/main")


@app.route("/main")
def main():
    return render_template("main.html")


@app.route("/calc")
def calc():
    return render_template("calc.html", mess="")

def reaction_control():
    pass

@app.route("/result", methods=['POST', 'GET'])
def result():
    if request.method == "POST":
        reaction = request.form['reaction']
        if reaction.strip() == "":
            return redirect("/calc")
        else:
            return render_template("result.html", react=request.form['reaction'])
    else:
        return redirect("/calc")


@app.route("/help")
def help():
    return render_template("help.html")

def calc_react( reaction_input ):
    r = "success"
    return r

@app.route("/get_balanced_reaction", methods=['POST', 'GET'])
def get_balanced_reaction():
    if request.method == "POST":
        return calc_react( request.form['react'] )
    else:
        return redirect("/main")


if __name__ == "__main__":
    app.run(host = "localhost", port = 80, debug=True)
