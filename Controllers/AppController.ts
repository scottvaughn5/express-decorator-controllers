function ensureValuesReady(target: any, propertyKey: string){
    target.Routes = target.Routes ?? {};
    target.Routes[propertyKey] = target.Routes[propertyKey] ?? {};
}

function route(value: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ensureValuesReady(target, propertyKey);
        target.Routes[propertyKey].route = value;
        let args = descriptor.value.toString().match(/\(([^)]+)\)/).pop();
        target.Routes[propertyKey].Arguments = args.split(",");        
    };
  }

function controller(constructor: Function){    
    constructor.prototype.BaseRoute = constructor.name.toLowerCase().replace("controller", "");
}

function get(target: any, propertyKey: string, descriptor: PropertyDescriptor){
    ensureValuesReady(target, propertyKey);
    target.Routes[propertyKey].method = "GET";
}
function post(target: any, propertyKey: string, descriptor: PropertyDescriptor){
    ensureValuesReady(target, propertyKey);
    target.Routes[propertyKey].method = "POST";
}



@controller
class AppController{

    @get
    @route("get/user")
    public GetAppUserById(id:number){        
        var that:any = this;                 
        if(that && that.Res){
            that.Res.send("request received" + id.toString());
        }
    }
    @route("post/user")
    @post
    public postUser(id:number, newName:string){
        var that:any = this;                 
        if(that && that.Res){
            that.Res.send("request received" + id.toString() + newName);
        }
    }

    public noRoute(){

    }
}
export default AppController;
export {AppController};