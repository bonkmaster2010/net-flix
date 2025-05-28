import { BrowserRouter, Routes, Route } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Favs from './comps/Favs.tsx';
import GenreContent from './comps/GenreContent.tsx';
import Layout from './comps/Layout.tsx';
import PageNotFound from './comps/404.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
  <Routes>
    <Route element={<Layout/>}>
      <Route path='/' element={<App/>}/>
      <Route path='/favs' element={<Favs/>}/>
      <Route path='/genres/:genreParam' element={<GenreContent/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Route>
  </Routes>
     </BrowserRouter>
  
  </StrictMode>,
)
