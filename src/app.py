from flask import Flask, redirect, render_template, request
from chemlib import Compound, Reaction

app = Flask(__name__)

@app.route("/")
def index():
    return redirect("/main")


@app.route("/main")
def main():
    return render_template("main.html")


@app.route("/calc")
def calc():
    return render_template("calc.html", mess="")


@app.route("/result", methods=['POST', 'GET'])
def result():
    if request.method == "POST":
        reaction = request.form['reaction']
        if reaction != "":
            return render_template("result.html", react=request.form['reaction'])
        else:
            return redirect("/calc")
    else:
        return redirect("/calc")


@app.route("/help")
def help():
    return render_template("help.html")

def calc_react( reaction_input ):

    parts = reaction_input.split("=")
    reactants_str = [a.strip() for a in parts[0].split("+")]
    products_str = [a.strip() for a in parts[1].split("+")]

    reactants = [Compound(el) for el in reactants_str]
    products = [Compound(el) for el in products_str]

    
    r = Reaction( reactants, products)
    r.balance()
    
    coeffs_str_list = [f'{value}' for key, value in r.coefficients.items() ]
    coeffs_output = ",".join(coeffs_str_list)

    return coeffs_output

@app.route("/get_coeffs", methods=['POST', 'GET'])
def get_coeffs():
    if request.method == "POST":
        return calc_react( request.form['react'] )
    else:
        return redirect("/main")


if __name__ == "__main__":
    app.run(host = "localhost", port = 80, debug=True)
