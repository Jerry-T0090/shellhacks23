import pymongo
import sys

try:
  client = pymongo.MongoClient("mongodb+srv://leftover_love_admin:Tu3x3FQ4WxOAFiJC@leftover-love.cvkp3hj.mongodb.net/?retryWrites=true&w=majority")
  
# return a friendly error if a URI error is thrown 
except pymongo.errors.ConfigurationError:
  print("An Invalid URI host error was received. Is your Atlas host name correct in your connection string?")
  sys.exit(1)

# database
leftover_love_db = client.leftover_love_db

# collection_ops
def modify_collection(collection, operation, query=None):
  try: 
    if operation == "add":
      additions = collection.insert_many(query) 
      return f"{additions.count} new additions to {collection.name}"
    elif operation == "search":
      if query == "all":
        finds = collection.find()
      else:
        finds = collection.find(query)
      return [finds]
    elif operation == "update":
      updates = collection.update_many(query, new=True)
      return f"Made {updates.count} updates.\nUpdates: {updates}"
    elif operation == "delete":
      deletes = collection.delete_many(query)
      return f"Deleted {deletes.count}.\nItems deleted: {deletes}"
    else:
     raise Exception(f"Invalid Operation: {operation}")
  except BaseException as e:
    raise Exception(f"An Unexpected Error Occurred: {e}")

# one_point database_ops
def perform_db_operation(collection_name, operation, query=None):
  collection = leftover_love_db[collection_name]
  modify_collection(collection, operation, query)


  
  # Recipient Testing
  # 1. Find all, one, non existent
  # 2. Add 1, Add existing 
  # 3. Modify existing, modify new
  # 4. Delete 1, delete all 
  # 5. Other errors


print(perform_db_operation("recipient", "search", "all"))

