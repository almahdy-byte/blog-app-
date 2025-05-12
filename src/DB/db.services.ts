import mongoose from "mongoose";

export class DBServices<TDOC>{
    constructor(private _model = mongoose.Model<TDOC>){
        
    }
    async create(data:Partial<TDOC>):Promise<TDOC>{
        return this._model.create(data);
    }
    
    async findOne(filter:Partial<TDOC>):Promise<TDOC | null>{
        return this._model.findOne(filter);
    }
    async findAll(filter:Partial<TDOC>):Promise<TDOC[]>{
        return this._model.find(filter);
    }
    async findById(id:string):Promise<TDOC | null>{
        return this._model.findById(id);
    }

}