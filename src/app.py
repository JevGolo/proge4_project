from flask import Flask, redirect, render_template, request

app = Flask(__name__)


@app.route("/")
def index():
    return redirect("/main")


@app.route("/main")
def main():
    return render_template("main.html")


@app.route("/calc")
def calc():
    return render_template("calc.html")


@app.route("/result", methods=['POST', 'GET'])
def result():
    if request.method == "POST":
        reaction = request.form['reaction']
        if reaction.strip() == "":
            return redirect("/calc")
        else:
            return render_template("result.html")
    else:
        return redirect("/calc")


@app.route("/help")
def help():
    return render_template("help.html")


if __name__ == "__main__":
    app.run(host = "192.168.0.105", port = 80, debug=True)
