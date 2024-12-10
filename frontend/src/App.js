import React from 'react';
import AppRouter from './AppRouter';

import { SubcategoryProvider } from './components/SubcategoryData';

function App() {
  return (
    <SubcategoryProvider>
      <AppRouter />
    </SubcategoryProvider>
  );
}

export default App;