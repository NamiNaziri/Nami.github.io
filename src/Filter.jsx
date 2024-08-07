/* eslint-disable react/prop-types */

const Filter = ({filterVal, handleSearchChange}) => {


  return (
    <>
         <input value={filterVal} onChange={handleSearchChange}/>
    </>
  )
}

export default Filter