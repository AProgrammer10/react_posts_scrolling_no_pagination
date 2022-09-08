import React from 'react'

import MySelect from './UI/select/MySelect'
import MyInput from './UI/input/MyInput'

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
            value={filter.query}
            onChange={e => setFilter({...filter, query: e.target.value})}
            placeholder='search'
        /> 

        <MySelect
            value={filter.sort}
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultValue='sorting by'
            options = {[
            {value: 'title', name: 'by title'},
            {value: 'body', name: 'by description'}
            ]}        
        />
        </div>
    )
}

export default PostFilter