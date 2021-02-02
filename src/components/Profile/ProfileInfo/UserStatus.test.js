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
        const root = component.root;
        let p = root.findByType('p')
        expect(p).not.toBeNull();
    });

    test('After creation input shouldnt exist', () => {
        // Виртуально создаем компоненту
        const component = create(<UserStatus status={'Hi there!'}/>);
        // Дай мне экземпляр. объект
        const root = component.root;
        expect(() => {
          let input = root.findByType('input');
        }).toThrow();
    });

    test('inner text of p should be correct', () => {
        let component = create(<UserStatus status={'Hi there!'}/>);
        const root = component.root;
        let p = root.findByType('p');
        expect(p.children[1]).toBe('Hi there!');
    });

    test('On double click input should be visible instead of p', () => {
        let element =  create(<UserStatus status={'Hi!'} />);
        const root = element.root;
        const p = root.findByType('p');
        p.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input.props.value).toBe('Hi!');
        expect(() => {
            let previousP = root.findByType('p');
        }).toThrow();
    });
    
    test('Callback should be called', () => {
        const callback = jest.fn();
        // Когда у нас будет деактивация, мы вызываем то что подусунули и нашу функцию. они вызываются как бы вместе
        let element = create(<UserStatus status={'Hi!'} updateStatus={callback}/>);
        const instance = element.getInstance();
        instance.editModeOff();
        expect(callback.mock.calls.length).toBe(1);
    })
})