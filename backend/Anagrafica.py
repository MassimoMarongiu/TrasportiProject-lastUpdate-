from flask_restx import Namespace, Resource, fields
from models import anagrafica
from flask_jwt_extended import jwt_required
from flask import request


anagrafica_ns = Namespace("anagrafica", description="A namespace for anagraficas")


anagrafica_model = anagrafica_ns.model(
    "anagrafica",
    {"id": fields.Integer(), "title": fields.String(), "description": fields.String()},
)


@anagrafica_ns.route("/hello")
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


@anagrafica_ns.route("/anagraficas")
class anagraficasResource(Resource):
    @anagrafica_ns.marshal_list_with(anagrafica_model)
    def get(self):
        """Get all anagraficas"""

        anagraficas = anagrafica.query.all()

        return anagraficas

    @anagrafica_ns.marshal_with(anagrafica_model)
    @anagrafica_ns.expect(anagrafica_model)
    @jwt_required()
    def post(self):
        """Create a new anagrafica"""

        data = request.get_json()

        new_anagrafica = anagrafica(
            title=data.get("title"),
              description=data.get("description")
        )

        new_anagrafica.save()

        return new_anagrafica, 201


@anagrafica_ns.route("/anagrafica/<int:id>")
class AnagraficaResource(Resource):
    @anagrafica_ns.marshal_with(anagrafica_model)
    def get(self, id):
        """Get a anagrafica by id"""
        anagrafica = anagrafica.query.get_or_404(id)

        return anagrafica

    @anagrafica_ns.marshal_with(anagrafica_model)
    @jwt_required()
    def put(self, id):
        """Update a anagrafica by id"""

        anagrafica_to_update = anagrafica.query.get_or_404(id)

        data = request.get_json()

        anagrafica_to_update.update(data.get("title"), data.get("description"))

        return anagrafica_to_update

    @anagrafica_ns.marshal_with(anagrafica_model)
    @jwt_required()
    def delete(self, id):
        """Delete a anagrafica by id"""

        anagrafica_to_delete = anagrafica.query.get_or_404(id)

        anagrafica_to_delete.delete()

        return anagrafica_to_delete