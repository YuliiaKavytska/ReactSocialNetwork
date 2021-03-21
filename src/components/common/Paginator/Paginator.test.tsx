import React from 'react';
import {create} from 'react-test-renderer';
import Paginator from "./Paginator";

describe('Tests for paginator', function () {
    test('pages count is 11 but should be showed only 10', function () {
        const component = create(<Paginator totalItemCount={11} pageSize={5} currentPage={1} updatePage={() => {}} />)
        const root = component.root
        let spans = root.findAllByType('span')
        expect(spans.length).toBe(3)
    })
})