import pandas as pd
from pulp import *
import math 
import numpy as np
import xlrd
from array import *
import json
import pickle
from flask import Flask, redirect, url_for, request, render_template, session, send_file
import urllib
import os.path
from os import path
import pickle
import os
import shutil
from pulp import LpProblem, LpMinimize, LpVariable, lpSum, PULP_CBC_CMD
import excelrd

import pymongo
import pandas as pd
import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config['MONGO_URI'] = "mongodb://localhost:27017"
mongo = pymongo.MongoClient(app.config['MONGO_URI'])
db = mongo["fci"]
collection = db["Users"]


@app.route('/')
def hello():
    return "Hi, PDS!"


@app.route('/home')
def home():
    return "Hey, welcome to home!"


@app.route('/add_user', methods=['POST'])
def add_user():
    if request.method == 'POST':
        user_data = request.get_json()

        result = collection.insert_one(user_data)

        if result.inserted_id:
            return jsonify({"message": "User added successfully", "user_id": str(result.inserted_id)}), 201
        else:
            return jsonify({"message": "Failed to add user"}), 400
    else:
        return jsonify({"message": "Invalid request method"}), 405


@app.route('/get_users', methods=['GET'])
def get_users():
    if request.method == 'GET':
        users = list(collection.find({}))

        user_list = []
        for user in users:
            user_dict = {
                "_id": str(user["_id"]),
                "name": user.get("name", ""),
                "password": user.get("password", ""),
            }
            user_list.append(user_dict)

        return jsonify({"users": user_list}), 200
    else:
        return jsonify({"message": "Invalid request method"}), 405


UPLOAD_FOLDER = 'Backend' 
ALLOWED_EXTENSIONS = {'xlsx', 'xls'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/uploadConfigExcel", methods=["POST"])
def uploadConfigExcel():
    data = {}
    try:
        file = request.files['uploadFile']
        if file and allowed_file(file.filename):
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], 'Data_1.xlsx')

            # Check if the directory exists, if not, create it
            os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

            # Save the file to the specified directory
            file.save(file_path)
            data['status'] = 1
            df = pd.read_excel(file_path)  # Read the uploaded file
            print(df)
        else:
            data['status'] = 0
            data['message'] = 'Invalid file. Only .xlsx or .xls files are allowed.'
    except Exception as e:
        print("Error:", e)
        data['status'] = 0
        data['message'] = 'Error uploading file'

    return jsonify(data)


@app.route("/getfcidata", methods=["POST"])
def fcidata():
    try:
        USN = pd.ExcelFile("Backend//Data_1.xlsx")
        FCI = pd.read_excel(USN, sheet_name='FCI', index_col=None)
        FPS = pd.read_excel(USN, sheet_name='FPS', index_col=None)

        Warehouse_No = FCI['FCI_ID'].nunique()
        FPS_No = FPS['FPS_ID'].nunique()
        Total_Demand = int(FPS['Allocation_Wheat'].sum()) 
        Total_Supply = int(FCI['FCI_Capacity'].sum())

        result = {
            "Warehouse_No": Warehouse_No,
            "FPS_No": FPS_No,
            "Total_Demand":Total_Demand, 
            "Total_Supply" : Total_Supply
        }

        return jsonify(result)

    except Exception as e:
        message = f"Error: {str(e)}"
        return jsonify({"status": 0, "message": message})
    
@app.route("/getGraphData", methods=["POST"])
def GraphData():
    try:
        USN = pd.ExcelFile("Backend//Data_1.xlsx")
        FCI = pd.read_excel(USN, sheet_name='FCI', index_col=None)
        FPS = pd.read_excel(USN, sheet_name='FPS', index_col=None)

        FCI_district = []
        FCI_Data = {}
        Disrticts_FCI = {}

        for i,j in zip(FCI["FCI_District"],FCI["FCI_ID"]):
            i = i.lower()
            if i not in FCI_district:
                FCI_district.append(i)
                globals()[f"FCI_{i}"] = []
            globals()[f"FCI_{i}"].append(j)
        for i in FCI_district:
            FCI_Data[i] = globals()[f"FCI_{i}"]
        Disrticts_FCI["Disrticts_FCI"] = FCI_district

        District_Capacity = {}
        for i in range(len(FCI["FCI_District"])):
            District_Name = FCI["FCI_District"][i]
            if District_Name not in District_Capacity:
                District_Capacity[District_Name] = int(FCI["FCI_Capacity"][i])
            else:
                District_Capacity[District_Name] += int(FCI["FCI_Capacity"][i])
        
        FPS_district = []
        FPS_Data = {}
        Districts_FPS = {}
        for i,j in zip(FPS["FPS_District"],FPS["FPS_Tehsil"]):
            i = i.lower()
            if i not in FPS_district:
                FPS_district.append(i)
                globals()[f"FPS_{i}"] = []
            if j not in globals()[f"FPS_{i}"]:
                globals()[f"FPS_{i}"].append(j)
        for i in FPS_district:
            FPS_Data[i] = globals()[f"FPS_{i}"]
            Districts_FPS["Districts_FPS"] = FPS_district
            
        District_Demand = {}
        for i in range(len(FPS["FPS_District"])):
            District_Name_FPS = FPS["FPS_District"][i]
            if District_Name_FPS not in District_Demand:
                District_Demand[District_Name_FPS] = int(FPS["Allocation_Wheat"][i])
            else:
                District_Demand[District_Name_FPS] += int(FPS["Allocation_Wheat"][i])
        # District_Demand = {k: int(v) for k, v in District_Demand.items()}

        District_Name_1={}
        District_Name=[]
        for i in District_Demand:
            if i not in District_Capacity:
                print("Not exise")
        else:
            if District_Capacity[i]<=District_Demand[i]:
                District_Name.append(i)
        District_Name_1["District_Name"] =District_Name

        
        print(District_Name_1)
        combined_data = {
            "District_Demand": District_Demand,
            "District_Capacity": District_Capacity,
            "District_Name_1": District_Name
        }
        print(District_Name_1)

        print(combined_data)
        
        return jsonify(combined_data)

    except Exception as e:
        message = f"Error: {str(e)}"
        return jsonify({"status": 0, "message": message})


@app.route("/processFile",methods = ["POST"])
def processFile():
    message = "DataFile file is incorrect"
    try:
        USN = pd.ExcelFile("Backend/Data_1.xlsx")
        WKB = excelrd.open_workbook("Backend/Distance_Matrix.xlsx")
    except:
        data = {}
        data["status"] = 0
        data["message"] = message
        json_data = json.dumps(data)
        json_object = json.loads(json_data) 
        return(json.dumps(json_object, indent = 1))

    Sheet1 = WKB.sheet_by_index(0)
    FCI=pd.read_excel(USN,sheet_name='FCI', index_col=None)
    FPS=pd.read_excel(USN,sheet_name='FPS',index_col=None)
    Original_Tagging=pd.read_excel(USN,sheet_name='Original_Tagging_FCI_FPS',index_col=None)
    FCI['FCI_District'] = FCI['FCI_District'].apply(lambda x: x.replace(' ', ''))
    FPS['FPS_District'] = FPS['FPS_District'].apply(lambda x: x.replace(' ', ''))


    
    Warehouse_No=[]
    FPS_No=[]
    Warehouse_No=FCI['FCI_ID'].nunique()
    FPS_No=FPS['FPS_ID'].nunique()
    Warehouse_Count={}
    print(Warehouse_Count)#No of warehouse
    FPS_Count={}
    Warehouse_Count["Warehouse_Count"]=Warehouse_No
    FPS_Count["FPS_Count"]=FPS_No#No of FPS
    print(FPS_Count)
    
    Total_Supply=[]
    Total_Supply_Warehouse={}
    Total_Supply= FCI['FCI_Capacity'].sum()
    Total_Supply_Warehouse["Total_Supply_Warehouse"]=Total_Supply#Total SUPPLY
    
    Total_Demand=[]
    Total_Demand_FPS={}
    Total_Demand= FPS['Allocation_Wheat'].sum()
    Total_Demand_FPS["Total_Demand_Warehouse"]=Total_Demand#Total demand
    print(Total_Demand_FPS)
    
    
    
    FCI_district = []
    FCI_Data = {}
    Disrticts_FCI = {}

    for i,j in zip(FCI["FCI_District"],FCI["FCI_ID"]):
        i = i.lower()
        if i not in FCI_district:
            FCI_district.append(i)
            globals()[f"FCI_{i}"] = []
        globals()[f"FCI_{i}"].append(j)
    for i in FCI_district:
        FCI_Data[i] = globals()[f"FCI_{i}"]
    Disrticts_FCI["Disrticts_FCI"] = FCI_district 

    
    District_Capacity = {}
    for i in range(len(FCI["FCI_District"])):
        District_Name=FCI["FCI_District"][i]
        if District_Name not in District_Capacity :
            District_Capacity [District_Name] = FCI["FCI_Capacity"][i]
        else:
            District_Capacity [District_Name] = FCI["FCI_Capacity"][i] + District_Capacity [District_Name]
    print(District_Capacity)#District wise supply
    
    
    FPS_district = []
    FPS_Data = {}
    Districts_FPS = {}
    for i,j in zip(FPS["FPS_District"],FPS["FPS_Tehsil"]):
        i = i.lower()
        if i not in FPS_district:
            FPS_district.append(i)
            globals()[f"FPS_{i}"] = []
        if j not in globals()[f"FPS_{i}"]:
            globals()[f"FPS_{i}"].append(j)
    for i in FPS_district:
        FPS_Data[i] = globals()[f"FPS_{i}"]
        Districts_FPS["Districts_FPS"] = FPS_district

    District_Demand = {}
    for i in range(len(FPS["FPS_District"])):
        District_Name_FPS=FPS["FPS_District"][i]
        if District_Name_FPS not in District_Demand :
            District_Demand [District_Name_FPS] = FPS["Allocation_Wheat"][i]
        else:
            District_Demand [District_Name_FPS] = FPS["Allocation_Wheat"][i] + District_Demand[District_Name_FPS]
        print(District_Demand)#District wise demand
        
    
    


    FCI_district = []
    FCI_Data = {}
    Disrticts_FCI = {}
    Data_state_wise = {}
    Data_statewise = {}
    

    for i,j in zip(FCI["FCI_District"],FCI["FCI_ID"]):
        i = i.lower()
        if i not in FCI_district:
            FCI_district.append(i)
            globals()[f"FCI_{i}"] = []
        globals()[f"FCI_{i}"].append(j)
    for i in FCI_district:
        FCI_Data[i] = globals()[f"FCI_{i}"]
    Disrticts_FCI["Disrticts_FCI"] = FCI_district
    
   
    

    FPS_district = []
    FPS_Data = {}
    Districts_FPS = {}
    for i,j in zip(FPS["FPS_District"],FPS["FPS_Tehsil"]):
        i = i.lower()
        if i not in FPS_district:
            FPS_district.append(i)
            globals()[f"FPS_{i}"] = []
        if j not in globals()[f"FPS_{i}"]:
            globals()[f"FPS_{i}"].append(j)
    for i in FPS_district:
        FPS_Data[i] = globals()[f"FPS_{i}"]
    Districts_FPS["Districts_FPS"] = FPS_district
    
    



    model = LpProblem('Supply-Demand-Problem', LpMinimize)

    Variable1=[]
    Variable2=[]
    for i in range(len(FCI["FCI_ID"])):
        for j in range(len(FPS["FPS_ID"])):
            Variable1.append(str(FCI["FCI_ID"][i]) + "_" + str(FCI["FCI_District"][i])+"_"+ str(FPS["FPS_ID"][j])+ "_"+ str(FPS["FPS_District"][j]) + "_Wheat")
            Variable2.append(str(FCI["FCI_ID"][i]) + "_" + str(FCI["FCI_District"][i])+"_"+ str(FPS["FPS_ID"][j])+ "_"+ str(FPS["FPS_District"][j]) + "_Rice")

    #Variables for Wheat from lEVEL2 TO FPS 
    DV_Variables1 = LpVariable.matrix("X",Variable1,cat="float",lowBound=0)
    Allocation1 = np.array(DV_Variables1).reshape(len(FCI["FCI_ID"]),len(FPS["FPS_ID"]))
    
    Variable1I=[]
    Allocation1I=[]
    for i in range(len(FCI["FCI_ID"])):
        for j in range(len(FPS["FPS_ID"])):
            Variable1I.append(str(FCI["FCI_ID"][i]) + "_" + str(FPS["FPS_ID"][j]) + "_Wheat1")
        
        
   #Variables for Wheat from IG TO FPS 
    DV_Variables1I = LpVariable.matrix("X",Variable1I,cat="Binary",lowBound=0)
    Allocation1I = np.array(DV_Variables1I).reshape(len(FCI["FCI_ID"]),len(FPS["FPS_ID"]))

    for i in range(len(FPS["FPS_ID"])):
        #print((lpSum(Allocation1B[j][i] for j in range(len(Base_Godown["BG_Code"])))+lpSum(Allocation1I[k][i] for k in range(len(Interior_Godown["IG_Code"])))<=1))
        model+=(lpSum(Allocation1I[k][i] for k in range(len(FCI["FCI_ID"])))<=1)


    for i in range(len(FCI["FCI_ID"])):
        for j in range(len(FPS["FPS_ID"])):
            model+=Allocation1[i][j]<=1000000*Allocation1I[i][j]
    

    Tehsil = {}
    UniqueId = 0
    Tehsil_temp = []
    Tehsil_rev = {}

    for i in FPS["FPS_Tehsil"]:
        Tehsil_temp.append(i)
        if i not in Tehsil:
            Tehsil[i] = UniqueId
            Tehsil_rev[UniqueId] = i
            UniqueId = UniqueId + 1
            
    

    Tehsil_FPS = []
    for i in range(len(FPS["FPS_ID"])):
        Tehsil_FPS.append(Tehsil[Tehsil_temp[i]])



    FCI_FPS=[]
    for col in range(Sheet1.nrows):
        temp = []
        for row in range (Sheet1.ncols):
            temp.append(Sheet1.cell_value(col,row))
        FCI_FPS.append(temp)
    


    allCombination1 = []
    

    for i in range(len(FCI_FPS)):
        for j in range(len(FPS["FPS_ID"])):
            allCombination1.append(Allocation1[i][j]*FCI_FPS[i][j])


    model += lpSum(allCombination1)


    #Demand Constraints for Wheat
    for i in range(len(FPS["FPS_ID"])):
        model+=((lpSum(Allocation1[j][i] for j in range(len(FCI["FCI_ID"]))))>=FPS["Allocation_Wheat"][i])


    #Supply Constraints for Warehouses
    for i in range(len(FCI["FCI_ID"])):
        model+=(lpSum(Allocation1[i][j] for j in range(len(FPS["FPS_ID"])))<=FCI["FCI_Capacity"][i])


   #Calling CBC_CMB Solver
    model.solve(PULP_CBC_CMD())
    Status = LpStatus[model.status]
    

    Original_Cost=100000000
    total =Original_Cost

    data = {}
    data["status"] = 1
    data["modelStatus"] = Status
    data["totalCost"] = float(round(model.objective.value(), 2))
    data["original"] = float(round(total, 2))
    data["percentageReduction"] = float(round(((total - model.objective.value())/total), 4)*100)
    data["Average_Distance"]=((float(round(model.objective.value(), 2)))/Total_Demand)
    data["Demand"]=int(FPS['Allocation_Wheat'].sum())
    print(data)
    #return jsonify(data)
    BGW = {}
    BGR = {}
    IGW = {}
    IGR = {}
    FCIW = {}

    BGCapacity = {}

    temp = {}
    for i in range(len(FCI["FCI_ID"])):
        temp[str(FCI["FCI_ID"][i])] = str(FCI["FCI_Capacity"])
    BGCapacity = temp
    
    

    temp1 = {}
    BG_FPS = [[] for i in range(len(Tehsil))]
    for i in range(len(FCI["FCI_ID"])):
        for j in range(len(FPS['FPS_ID'])):
            BG_FPS[Tehsil_FPS[j]].append(Allocation1[i][j].value())
        temp1[str(FCI["FCI_ID"][i])] = str(lpSum(Allocation1[i][j].value() for j in range(len(FPS["FPS_ID"]))))
        BGCapacity[str(FCI["FCI_ID"][i])] = str(FCI["FCI_Capacity"][i])
    BGW["FPS"] = temp1
    


    BG_FPS_Wheat = {}
    for i in range(len(Tehsil)):
        BG_FPS_Wheat[str(Tehsil_rev[i])] = str(lpSum(BG_FPS[i]))
    

    #temp2 = {}
    #BG_FPS = [[] for i in range(len(Tehsil))]
    #for i in range(len(FCI["FCI_ID"])):
        #for j in range(len(FPS['FPS_ID'])):
            #BG_FPS[Tehsil_FPS[j]].append(Allocation2[i][j].value())
        #temp2[str(FCI["FCI_ID"][i])] = str(lpSum(Allocation2[i][j].value() for j in range(len(FPS["FPS_ID"]))))
    #BGR["FPS"] = temp2
    

    BG_FPS_Rice = {}
    for i in range(len(Tehsil)):
        BG_FPS_Rice[str(Tehsil_rev[i])] = str(lpSum(BG_FPS[i]))


    data["BGW"] = BGW
    data["BGR"] = BGR
    data["FPSW"] = BG_FPS_Wheat
    data["FPSR"] = BG_FPS_Rice
    data["BGCapacity"] = BGCapacity


    Output_File = open("output.csv","w")
    #Writing Values in output file
    for v in model.variables():
        if v.value()>0:
            Output_File.write(v.name + "\t" + str(v.value()) + "\n")

            
        

    Output_File.close()
    Output_File = open("output.csv","r")
    count_BG_FPS_Wheat = 0
    count_BG_FPS_Rice = 0

    for line in Output_File:
        score = float(line.split("\t")[1])
        if(score>0.0):
            tag = line.split("\t")[0]
            if(tag in BG_FPS_Wheat):
                count_BG_FPS_Wheat = count_BG_FPS_Wheat + 1
            if(tag in BG_FPS_Rice):
                count_BG_FPS_Rice = count_BG_FPS_Rice + 1

    tableData = {}
    optimalData = {}
    optimalData["count_BG_FPS_Wheat"] = str(count_BG_FPS_Wheat)
    optimalData["count_BG_FPS_Rice"] = str(count_BG_FPS_Rice)
    tableData["optimalData"] = optimalData


    Original_Tagging_Wheat_BG_FPS = len(Original_Tagging["FPS_ID"])
    Original_Tagging_Rice_BG_FPS = len(Original_Tagging["FPS_ID"])



    originalData = {}
    originalData["Original_Tagging_Wheat_BG_FPS"] = str(Original_Tagging_Wheat_BG_FPS)
    originalData["Original_Tagging_Rice_BG_FPS"] = str(Original_Tagging_Rice_BG_FPS)
    tableData["originalData"] = originalData


    Original_BG_FPS_Wheat = []
    Original_BG_FPS_Rice = []


    Original_BG_FPS_Rice = Original_Tagging["FPS_ID"]
    Sum_BG_FPS_Rice = 0
    for i in range(0, len(Original_BG_FPS_Rice)):
        Sum_BG_FPS_Rice = (str(Sum_BG_FPS_Rice)) + (str(Original_BG_FPS_Rice[i]))

    Original_BG_FPS_Wheat = Original_Tagging["FPS_ID"]
    Sum_BG_FPS_Wheat = 0
    for i in range(0, len(Original_BG_FPS_Wheat)):
        Sum_BG_FPS_Wheat = (str(Sum_BG_FPS_Wheat))+ (str(Original_BG_FPS_Wheat[i]))



    sumData = {}
    sumData["Sum_BG_FPS_Rice"] = str(Sum_BG_FPS_Rice)
    sumData["Sum_BG_FPS_Wheat"] = str(Sum_BG_FPS_Wheat)
    tableData["sumData"] = sumData
    


    Data_state_wise["FCI_Data"] = FCI_Data
    Data_state_wise["FPS_Data"] = FPS_Data
    Data_state_wise["FCI_district"]= FCI_district
    Data_state_wise["FPS_district"]= FPS_district
    print("Hello")



    data["TableData"] = tableData
    data["Datastatewise"] = Data_state_wise

    json_data = json.dumps(data)
    json_object = json.loads(json_data)
    print("Hello1")

    if os.path.exists("ouputPickle.pkl"):
        os.remove("ouputPickle.pkl")

    # open pickle file
    dbfile1 = open('ouputPickle.pkl', 'ab')

    # save pickle data
    pickle.dump(json_object, dbfile1)                     
    dbfile1.close()
    
    data["status"] = 1
    
    json_data = json.dumps(data)
    json_object = json.loads(json_data) 
    return(json.dumps(json_object, indent = 1))
    
    



    # df1 = pd.read_csv("output.csv")
    # df2 = pd.ExcelFile("Data1.xlsx")
    # df1[['Var','F_no','F_D','T_no','T_D','Commodity_Value']] = df1[df1.columns[0]].str.split('_', n=6, expand=True)
    # del df1[df1.columns[0]]
    # df1[['Commodity', 'Values']] = df1['Commodity_Value'].str.split('\t', n=1, expand=True)
    # del df1['Commodity_Value']
    # df1 = df1.drop(np.where(df1["Commodity"]=="Nan")[0])
    # df1['Values'].replace('', np.nan, inplace=True)
    # df1.dropna(subset=['Values'], inplace=True)
    # df1=df1.drop(np.where(df1["Values"]=="0.0")[0])
    # df_new = df1[['F_no', 'F_D',"T_no","T_D","Commodity","Values"]]
    # df_new.insert(0, "From", "Depot")
    # df_new.insert(3, "To", "FPS")
    # df_new.to_excel("Tagging_Sheet.xlsx",sheet_name='BG_FPS',)


    
if __name__ == '__main__':
    app.run(debug=True)


@app.teardown_appcontext
def close_mongo_connection(exception=None):
    mongo.close()
