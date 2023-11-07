import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route
            element={
              isLoggedIn ? (
                <JobApply />
              ) : (
                <Modal
                  onCancel={handleCancelLogin}
                  footer={null}
                  width={800}
                  title="Login"
                  open={true}
                >
                  <AuthenticationPage />
                </Modal>
              )
            }
            path="/applyjob/:id"
          />
          <Route
            element={
              isLoggedIn ? (
                <CreateJob />
              ) : (
                <Modal
                  onCancel={handleCancelLogin}
                  footer={null}
                  width={800}
                  title="Login"
                  open={true}
                >
                  <AuthenticationPage />
                </Modal>
              )
            }
            path="/createjob"
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
