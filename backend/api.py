from flask import Flask, request
from flask_restful import Resource, Api
from database import perform_db_operation

app = Flask(__name__)
api = Api(app)

class Recipient(Resource):
    def get(self):
        return perform_db_operation("recipient", "search", {"name" :"Zaina"}) 
        
    def put(self, recipient_id):
        new_user = request.form['data']
        return perform_db_operation("recipient", "add", {"name" :"Qasim"}) 

class Supplier(Resource):
    def get(self):
        return {'hello': 'world'} # Supplier information from the database
    
    def put(self, supplier_id):
        return {'hello': 'world'} # Edit Supplier information, return success, failure
    
class AvailableItems(Resource):
    def get(self):
        return {'hello': 'world'} # Items information from the database
    
    def put(self, items_id):
        return {'hello': 'world'} # Edit Items information, return success, failure

api.add_resource(Recipient, '/recipient/get_all_users', 
                 '/recipient/<string:recipient_id>')
api.add_resource(Supplier, '/supplier/<string:supplier_id>')
api.add_resource(AvailableItems, '/supplier/<string:items_id>')

if __name__ == '__main__':
    app.run(debug=True)