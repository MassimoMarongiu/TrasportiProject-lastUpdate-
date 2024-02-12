from flask_restx import Namespace, Resource, fields
from models import tipoPagamento
from flask_jwt_extended import jwt_required
from flask import request


tipoPagamento_ns = Namespace("tipoPagamento", description="A namespace for tipoPagamentos")


tipoPagamento_model = tipoPagamento_ns.model(
    "tipoPagamento",
    {"id": fields.Integer(), "title": fields.String(), "description": fields.String()},
)


@tipoPagamento_ns.route("/hello")
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


@tipoPagamento_ns.route("/tipoPagamentos")
class tipoPagamentosResource(Resource):
    @tipoPagamento_ns.marshal_list_with(tipoPagamento_model)
    def get(self):
        """Get all tipoPagamentos"""

        tipoPagamentos = tipoPagamento.query.all()

        return tipoPagamentos

    @tipoPagamento_ns.marshal_with(tipoPagamento_model)
    @tipoPagamento_ns.expect(tipoPagamento_model)
    @jwt_required()
    def post(self):
        """Create a new tipoPagamento"""

        data = request.get_json()

        new_tipoPagamento = tipoPagamento(
            title=data.get("title"), description=data.get("description")
        )

        new_tipoPagamento.save()

        return new_tipoPagamento, 201


@tipoPagamento_ns.route("/tipoPagamento/<int:id>")
class TipoPagamentoResource(Resource):
    @tipoPagamento_ns.marshal_with(tipoPagamento_model)
    def get(self, id):
        """Get a tipoPagamento by id"""
        tipoPagamento = tipoPagamento.query.get_or_404(id)

        return tipoPagamento

    @tipoPagamento_ns.marshal_with(tipoPagamento_model)
    @jwt_required()
    def put(self, id):
        """Update a tipoPagamento by id"""

        tipoPagamento_to_update = tipoPagamento.query.get_or_404(id)

        data = request.get_json()

        tipoPagamento_to_update.update(data.get("title"), data.get("description"))

        return tipoPagamento_to_update

    @tipoPagamento_ns.marshal_with(tipoPagamento_model)
    @jwt_required()
    def delete(self, id):
        """Delete a tipoPagamento by id"""

        tipoPagamento_to_delete = tipoPagamento.query.get_or_404(id)

        tipoPagamento_to_delete.delete()

        return tipoPagamento_to_delete