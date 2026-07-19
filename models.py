from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Certificate(db.Model):
    __tablename__ = "certificates"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200), nullable=False)
    organization = db.Column(db.String(200), nullable=False)
    year = db.Column(db.String(20))

    description = db.Column(db.Text)

    image = db.Column(db.String(255), nullable=False)

    sort_order = db.Column(db.Integer, default=0)

    active = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return self.title


class Consultation(db.Model):
    __tablename__ = "consultations"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(150), nullable=False)

    duration = db.Column(db.String(100))

    price = db.Column(db.Integer, nullable=False)

    description = db.Column(db.Text)

    badge = db.Column(db.String(100))

    sort_order = db.Column(db.Integer, default=0)

    active = db.Column(db.Boolean, default=True)

    features = db.relationship(
        "ConsultationFeature",
        backref="consultation",
        cascade="all, delete-orphan",
        lazy=True
    )

    def __repr__(self):
        return self.title


class ConsultationFeature(db.Model):
    __tablename__ = "consultation_features"

    id = db.Column(db.Integer, primary_key=True)

    consultation_id = db.Column(
        db.Integer,
        db.ForeignKey("consultations.id"),
        nullable=False
    )

    text = db.Column(db.String(255), nullable=False)

    sort_order = db.Column(db.Integer, default=0)

    def __repr__(self):
        return self.text