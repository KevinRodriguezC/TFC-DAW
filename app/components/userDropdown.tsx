import { Menu } from "@headlessui/react";
import { Link } from "@remix-run/react";

export function UserDropdown({ username }: { username: any }) {
  return (
    <Menu>
      <Menu.Button className="btn-user-icon bg-purple-600">
        {username}
      </Menu.Button>
      <Menu.Items className="absolute top-16 right-1 p-2 bg-slate-100 border-slate-200 border-2 rounded-2xl flex flex-col gap-2 min-w-72">
        <div className="flex gap-2">
          <div className="btn-user-icon bg-purple-600 gap-2">{username}</div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">Username</h2>
            <h4>@Username</h4>
          </div>
        </div>
        <Menu.Item>
          {({ active }) => (
            <Link className="btn-header-secondary" to="/">
              Home
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link className="btn-header-secondary" to="/settings">
              Manage account
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link className="btn-header-secondary" to="/u">
              View profile
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link className="btn-danger" to="/logout">
              logout
            </Link>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
