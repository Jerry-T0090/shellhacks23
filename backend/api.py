from flask import Flask, request, make_response
from flask_restful import Resource, Api
from database import perform_db_operation

app = Flask(__name__)
api = Api(app)

class Recipient(Resource):
    
    def post(self):
        # ADD NEW RECIPIENT
        try:
            new_recipient_data = request.form['data']
            perform_db_operation("recipient", "add", new_recipient_data)
            return make_response("Recipient add successfully", 200)  
        except Exception as e:
            return make_response(f"Recipient not added. {str(e)}", 500)
        
    def get(self):
        # RETRIEVE EXISTING RECIPIENT
        try:
            search_query = request.form['data']
            recipient = perform_db_operation("recipient", "search", query=search_query) 
            if len(recipient) == 0:
                return make_response("Recipient not found", 404) 
            else: return make_response(recipient[0], 200) 
        except Exception as e:
            return make_response(f"Search failed. {str(e)}", 500)
        
    def put(self, recipient_id):
        # UPDATE RECIPIENT
        try:
            update = request.form['data']
            update = perform_db_operation("recipient", "update", query={"_id": recipient_id}, update=update) 
            if update[0] != update[1]:
                return make_response(f"Failed to update {update[0]}/{update[1]} recipient(s).", 500)
            else: return make_response(f"Updated recipient(s)", 200)
        except Exception as e:
            return make_response(f"Failed to update {update[0]}/{update[1]} recipient(s).", 500)
    
    def delete(self, recipient_id):
        # DELETE RECIPIENT
        try:
            recipients_found = perform_db_operation("recipient", "search", {"_id": recipient_id}) 
            delete_count = perform_db_operation("recipient", "delete", {"_id": recipient_id}) 
            if len(recipients_found) == delete_count:
                return make_response(f"Recipient(s) successfully deleted.", 200)
            else: return make_response(f"Failed to delete recipient(s).", 500)
        except Exception as e:
            return f"ERROR: {str(e)}"

class Supplier(Resource):
    
    def post(self):
        # ADD NEW SUPPLIER 
        try:
            new_supplier_data = request.form['data']
            perform_db_operation("supplier", "add", new_supplier_data)
            return make_response("Supplier add successfully", 200)  
        except Exception as e:
            return make_response(f"Supplier not added. {str(e)}", 500)
        
    def get(self):
        # RETRIEVE EXISTING SUPPLIER 
        try: # Retrieve supplier by id/phone [unique]
            search_query = request.form['data']
            suppliers = perform_db_operation("supplier", "search", query=search_query)
            if "_id" in search_query.keys() or "phone" in search_query.keys(): # Retrieving 1 supplier based on search by unique id
                if len(suppliers) == 0:
                    return make_response("Supplier not found", 404)
                else:
                    return make_response(suppliers[0], 200)   
            else: # Retrieving using other parameters [more than one possible]
                return make_response(suppliers, 200) 
        except Exception as e:
            return make_response(f"Search failed. {str(e)}", 500)
        
    def put(self, supplier_id):
        try:
            update = request.form['data']
            update = perform_db_operation("supplier", "update", query={"_id": supplier_id}, update=update) 
            if update[0] != update[1]:
                return make_response(f"Failed to update {update[0]}/{update[1]} supplier(s).", 500)
            else: return make_response(f"Updated supplier(s)", 200)
        except Exception as e:
            return make_response(f"Failed to update {update[0]}/{update[1]} supplier(s).", 500)
    
    def delete(self, supplier_id):
        try:
            suppliers_found = perform_db_operation("supplier", "search", {"_id": supplier_id}) 
            delete_count = perform_db_operation("supplier", "delete", {"_id": supplier_id}) 
            if len(suppliers_found) == delete_count:
                return make_response(f"Supplier(s) successfully deleted.", 200)
            else: return make_response(f"Failed to delete supplier(s).", 500)
        except Exception as e:
            return f"ERROR: {str(e)}"

class AvailableItems(Resource):
    
    def post(self):
        # ADD NEW AVAILABLE 
        try:
            new_item_data = request.form['data']
            perform_db_operation("item", "add", new_item_data)
            return make_response("Item(s) added successfully", 200)  
        except Exception as e:
            return make_response(f"Item(s) not added. {str(e)}", 500)
        
    def get(self):
        # SEARCH FOR ITEMS 
        try:
            search_query = request.form['data']
            items = perform_db_operation("available_items", "search", query=search_query)
            if "_id" in items.keys(): # Retrieving 1 item based on search by unique id
                items = perform_db_operation("available_items", "search", query=search_query)
                if len(items) == 0:
                    return make_response("Specified id does not have an associated item.", 404)
                else:
                    return make_response(items[0], 200)   
            else: # Retrieving using other parameters 
                return make_response(items, 200) 
        except Exception as e:
            return make_response(f"Search failed. {str(e)}", 500)
        
    def put(self):
        try:
            data = request.form['data']
            query=data["query"]
            update=data["update"]
            update = perform_db_operation("item", "update", query=query, update=update) 
            if update[0] != update[1]:
                return make_response(f"Failed to update {update[0]}/{update[1]} items(s).", 500)
            else: return make_response(f"Updated items(s)", 200)
        except Exception as e:
            return make_response(f"Failed to update {update[0]}/{update[1]} items(s).", 500)
    
    def delete(self):
        try:
            data = request.form['data']
            query=data["query"]
            suppliers_found = perform_db_operation("supplier", "search", query) 
            delete_count = perform_db_operation("supplier", "delete", query) 
            if len(suppliers_found) == delete_count:
                return make_response(f"Items(s) successfully deleted.", 200)
            else: return make_response(f"Failed to delete items(s).", 500)
        except Exception as e:
            return f"ERROR: {str(e)}"


api.add_resource(Recipient, '/recipient',
                 '/recipient/<string:recipient_id>')
api.add_resource(Supplier, '/supplier',
                 '/supplier/<string:supplier_id>')
api.add_resource(AvailableItems, '/items')

if __name__ == '__main__':
    app.run(debug=True)