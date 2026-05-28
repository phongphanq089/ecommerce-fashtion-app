'use client';

import { Refine, Authenticated } from '@refinedev/core';
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  NavigateToResource,
  CatchAllNavigate,
} from '@refinedev/react-router';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { authProvider } from './providers/auth';
import { useNotificationProvider } from './providers/notification';
import { resources } from './config/resources';

// import { PostsListPage } from "./routes/posts/list";
// import { UsersListPage } from "./routes/users/list";
import HomePage from './routes/home';
import { createDataProvider } from './providers/data';
import { AppLayout } from './components/app-layout';
import { ErrorComponent } from '@/components/admin-ui/shared/error-component';
import { SignInForm } from './components/form/sign-in-form';
import { SignUpForm } from './components/form/sign-up-form';
import { ForgotPasswordForm } from './components/form/forgot-password-form';
import { Toaster } from './components/notification/toaster';
import { Breadcrumb } from '@/components/admin-ui/shared/breadcrumb';
import { PostsListPage } from './routes/posts/list';
import CreatePost from './routes/posts/create';
import { UsersListPage } from './routes/users/list';
import EditPost from './routes/posts/edit';
import ShowPost from './routes/posts/show';

// import { HomePage } from "./routes/home";
// import CreatePost from "./routes/posts/create";
// import ShowPost from "./routes/posts/show";
// import EditPost from "./routes/posts/edit";
// import { ForgotPasswordForm } from "./components/forgot-password-form";

const API_URL = 'https://api.fake-rest.refine.dev';
export function AdminApp({ basename = '/admin' }: { basename?: string }) {
  return (
    <BrowserRouter basename={basename}>
      <Refine
        dataProvider={createDataProvider(API_URL)}
        authProvider={authProvider}
        routerProvider={routerProvider}
        notificationProvider={useNotificationProvider}
        resources={resources}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <Routes>
          <Route
            element={
              <AppLayout>
                <Authenticated
                  key="authenticated-routes"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <Outlet />
                </Authenticated>
              </AppLayout>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostsListPage />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/edit/:id" element={<EditPost />} />
            <Route path="/posts/show/:id" element={<ShowPost />} />
            <Route path="/users" element={<UsersListPage />} />
            <Route path="/settings" element={<div>Settings List Page</div>} />
            <Route
              path="/settings/notifications"
              element={
                <div>
                  <Breadcrumb />

                  <h1>Notifications List Page</h1>
                </div>
              }
            />
            <Route
              path="/settings/notifications/:id/edit"
              element={
                <div>
                  <Breadcrumb />

                  <h1>Notifications Edit Page</h1>
                </div>
              }
            />
            <Route path="/profile" element={<div>Profile List Page</div>} />
            <Route path="/finance" element={<div>Finance List Page</div>} />
            <Route path="/expenses" element={<div>Expenses List Page</div>} />
            <Route path="/income" element={<div>Income List Page</div>} />
            <Route path="/directory" element={<div>Directory List Page</div>} />
            <Route path="*" element={<ErrorComponent />} />
          </Route>

          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <NavigateToResource resource="posts" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<SignInForm />} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          </Route>

          <Route
            element={
              <Authenticated key="catch-all">
                <Outlet />
              </Authenticated>
            }
          >
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>

        <Toaster />
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
}
