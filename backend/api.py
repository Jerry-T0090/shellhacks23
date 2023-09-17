from flask import Flask, request, make_response
from flask_restful import Resource, Api
from database import perform_db_operation

app = Flask(__name__)
api = Api(app)

class Recipient(Resource):
    
    def post(self):
        try:
            new_recipient_data = request.form['data']
            perform_db_operation("recipient", "add", new_recipient_data)
            return make_response("Recipient add successfully", 200)  
        except Exception as e:
            return make_response(f"Recipient not added. {str(e)}", 500)
        
    def get(self):
        try:
            search_query = request.form['data']
            recipient = perform_db_operation("recipient", "search", query=search_query) 
            if len(recipient) == 0:
                return make_response("Recipient not found", 404) 
            else: return make_response(recipient[0], 200) 
        except Exception as e:
            return make_response(f"Search failed. {str(e)}", 500)
        
    def put(self, recipient_id):
        try:
            update = request.form['data']
            update = perform_db_operation("recipient", "update", query={"_id": recipient_id}, update=update) 
            if update[0] != update[1]:
                return make_response(f"Failed to update {update[0]}/{update[1]} recipient(s).", 500)
            else: return make_response(f"Updated recipient(s)", 200)
        except Exception as e:
            return make_response(f"Failed to update {update[0]}/{update[1]} recipient(s).", 500)
    
    def delete(self, recipient_id):
        try:
            recipients_found = perform_db_operation("recipient", "search", {"_id": recipient_id}) 
            delete_count = perform_db_operation("recipient", "delete", {"_id": recipient_id}) 
            if len(recipients_found) == delete_count:
                return make_response(f"Recipient(s) successfully deleted.", 200)
            else: return make_response(f"Failed to delete recipient(s).", 500)
        except Exception as e:
            return f"ERROR: {str(e)}"

api.add_resource(Recipient, '/recipient',
                 '/recipient/<string:recipient_id>')

if __name__ == '__main__':
    app.run(debug=True)