import {RouteObject, useRoutes} from "react-router";
import CreditLayout from "../layouts/CreditLayout";
import ChangeAnketaLayout from "../layouts/ChangeAnketaLayout";
import {CreditParameters} from "../components/CreditParameters/CreditParameters";
import {AuthWindowWrapper} from "goshadostalo15package";
import {WorkInfo} from "../components/WorkInfo/WorkInfo";
import useFormStepWatcher from "../customHooks/useFormStepWatcher";
import {WorkInfoWork} from "../components/WorkInfoWork/WorkInfoWork";

function Router() {

    const routes: RouteObject[] = [
        {
            path: '/', element: <AuthWindowWrapper currentTheme={'dark' as any} backUrl={'https://develop.onbank.online'}/>
        },
        {
            path: "/credit", element: <CreditLayout/>, children: [
                {
                    path: ":product", children: [
                        {path: "credit_parameters_info", element: <CreditParameters/>},
                        {path: "work_info", element: <WorkInfo/>},
                        {path: "work_info/work", element: <WorkInfoWork/>},
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
