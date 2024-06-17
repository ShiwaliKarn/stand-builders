'use client';

import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar } from 'antd';
import { useEffect } from 'react';
import {LogoutOutlined} from '@ant-design/icons';
import '../Loginpopup.css'

const Profilelogin = ({ setLoggedIn }) => {


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [setLoggedIn]);

    const handleLogout = () => {
   
        localStorage.removeItem('token'); // Remove JWT token from local storage
        setLoggedIn(false); // Update authentication state to indicate logout
    };


    const items = [
        {
            label: <a href="https://www.antgroup.com">1st menu item</a>,
            key: '0',
        },
        {
            label: <a href="https://www.aliyun.com">2nd menu item</a>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <span>Log out <LogoutOutlined style={{ fontSize: "11px", transform: "rotate(-90deg)" }}  /></span>,
            key: '3',
            onClick: handleLogout,

        },
    ];

    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
                trigger={['click']}
            >
                <a onClick={(e) => e.preventDefault()}>

                    <Space>
                        
                        <Avatar
                            title='user profile'
                            style={{
                                backgroundColor: '#2988b7',
                                cursor: 'pointer'
                            }}
                            icon={<UserOutlined />}
                        />

                    </Space>
                </a>
            </Dropdown>
        </>
    )
}
export default Profilelogin

