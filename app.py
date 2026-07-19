from flask import Flask, render_template
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from sqlalchemy import asc

from models import (
    db,
    Certificate,
    Consultation,
    ConsultationFeature
)

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://root:YOUR_PASSWORD@localhost/psychologist"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "super_secret_key"

db.init_app(app)


admin = Admin(
    app,
    name="Психолог: Адмінка"
)

admin.add_view(ModelView(Certificate, db.session))
admin.add_view(ModelView(Consultation, db.session))
admin.add_view(ModelView(ConsultationFeature, db.session))


@app.route("/")
def home():

    certificates = Certificate.query.filter_by(active=True).order_by(asc(Certificate.sort_order)).all()
    consultations = Consultation.query.filter_by(active=True).order_by(asc(Consultation.sort_order)).all()

    return render_template(
        "homepage.html",
        certificates=certificates,
        consultations=consultations
    )


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)