import {RouteObject, useRoutes} from "react-router";
import CreditLayout from "../layouts/CreditLayout";
import ChangeAnketaLayout from "../layouts/ChangeAnketaLayout";
import {CreditParameters} from "../components/CreditParameters/CreditParameters";

function Router() {
    const routes: RouteObject[] = [
        {
            path: "/credit", element: <CreditLayout/>, children: [
                {
                    path: ":product", children: [
                        {path: "credit_parameters_info", element: <CreditParameters/>},
                        {path: "work_info", element: <div>132</div>},
                        {path: "additional_info", element: <div>132</div>},
                        {path: "passport_info", element: <div>132</div>},

                    ]
                }
            ]
        },


        {
            path: '/change_anketa', element: <ChangeAnketaLayout/>, children: [
                {
                    path: ":product", children: [
                        {path: "credit_parameters_info", element: '<CreditParameters/>'},
                        {path: "work_info", element: '<WorkInfo/>'},
                        {path: "additional_info", element: '<AdditionalInfo/>'},
                        {path: "passport_info", element: '<PassportInfo/>'},
                    ]
                }
            ]
        }
    ]

    return useRoutes(routes)

}


export default Router
