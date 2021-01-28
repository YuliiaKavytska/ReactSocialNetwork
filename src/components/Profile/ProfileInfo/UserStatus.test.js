import React from 'react';
import {create} from 'react-test-renderer';
import HookUserStatus from "./HookUserStatus";
import UserStatus from "./UserStatus";

// Это набор тестов. Описывавем то, что будем тестировать
describe('Profile status test component', () => {
    test('Status form props should be in the state', () => {
        // Виртуально создаем компоненту
        const component = create(<UserStatus status={'Hi there!'}/>);
        // Дай мне экземпляр. объект
        const instance = component.getInstance();
        expect(instance.state.status).toBe('Hi there!');
    });

    test('After creation status should have tag p with correct status', () => {
        // Виртуально создаем компоненту
        const component = create(<UserStatus status={'Hi there!'}/>);
        // Дай мне экземпляр. объект
        const instance = component.getInstance();
        let p = instance.findByType('p')
        expect(p.length).toBe(1);
    });
})