import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import { CreatePage } from "../pages/CreatePage/CreatePage";
import { SuccessPage } from "../pages/SuccessPage";
import   MemoryPage   from "../pages/Memory/MemoryPage";
import {MemoryPagePreview} from "../pages/Memory/MemoryPagePreview";

export const Router = () =>{
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            
            {/*Index indica a rota padrao */}
            <Route index element={<HomePage/>}/>
            <Route path="/criar" element={<CreatePage/>}/>
            <Route path="/m/:slug" element={<MemoryPage />}/>
                <Route path="/sucesso" element={<SuccessPage/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
               <Route path="/preview-memoria" element={<MemoryPagePreview />} />
            




        

        </Routes>
    )
}