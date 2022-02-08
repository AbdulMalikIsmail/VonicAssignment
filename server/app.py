from flask import Flask, redirect, url_for, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

DB_URI = "mongodb://abdulmalikismail:abdul%40mongo@cluster0-shard-00-00.fgnsy.mongodb.net:27017,cluster0-shard-00-01.fgnsy.mongodb.net:27017,cluster0-shard-00-02.fgnsy.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-g13lzz-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoClient = MongoClient(DB_URI)
db = mongoClient.get_database('vonic_db')
products_col = db.get_collection('products_col')
orders_col = db.get_collection('orders_col')

@app.route('/addproducts/<name>/')
def addname(name):
    products_col.insert_one({"name": name.lower()})
    return redirect(url_for('getproductlist'))

@app.route('/createOrder', methods=['POST'])   
@cross_origin()
def createOrder():
    def createDocument(data):
        if "products" in data:
            return {
                "orderDetails" : data['products']
            }
        return None

    data = request.json
    if data is None or data == {} :
        return json.dumps({"error":"Please provide data", "status":False})

    document = createDocument(data)
    if document:
        orders_col.insert_one(document)
        response = app.response_class(
            response=json.dumps({"error":"Order Saved Successfully", "status":True}),
            status=200,
            mimetype='application/json'
        )
        return response

    return app.response_class(
            response=json.dumps({"error":"Failed to place an Orer", "status":False}),
            status=200,
            mimetype='application/json'
        )
    
@app.route('/getproductlist', methods=['GET'])
@cross_origin()
def getproductlist():
    products_json = []
    if products_col.find({}):
        for name in products_col.find({}).sort("name"):
            products_json.append({"name": name['name'], "id": str(name['_id']), "description": name['description']})

    response = app.response_class(
        response=json.dumps(products_json),
        status=200,
        mimetype='application/json'
    )
    return response
    # return jsonify(products_json)

@app.route('/fetchOrder', methods=['GET'])
def fetchOrder():
    orderdetails_json = []
    if orders_col.find({}):
        for name in orders_col.find({}).sort("name"):
            orderdetails_json.append({"id": str(name['_id']), "orderDetails": name['orderDetails']})

    return app.response_class(
        response=json.dumps(orderdetails_json),
        status=200,
        mimetype='application/json'
    )

if __name__ == "__main__":
    app.run(debug=True)