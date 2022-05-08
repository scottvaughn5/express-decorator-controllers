import express from 'express';
import AppController from './Controllers/AppController';


const app = express();
const port = 3000;

let appcontroller:any = new AppController();
for(let routeKey of Object.keys(appcontroller.Routes)){
  let thisRoute = appcontroller.Routes[routeKey]
  const baseRoute = "/" + appcontroller.constructor.prototype.BaseRoute + "/";
  switch(thisRoute.method.toLowerCase()){
    case "get":
      app.get(baseRoute + thisRoute.route, (req, res) => {
        appcontroller.Req = req;
        appcontroller.Res = res;
        let parameters:any = [];
        for(let arg of thisRoute.Arguments){
          parameters.push(req.query[arg]);
        }
        appcontroller[routeKey](...parameters)
      })
      break;
      case "post":
        app.post(baseRoute + thisRoute.route, (req, res) => {
          appcontroller.Req = req;
          appcontroller.Res = res;
          appcontroller[routeKey](...thisRoute.Arguments)
        })
        break;
  }

}



app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});