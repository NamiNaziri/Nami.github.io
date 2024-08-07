/* eslint-disable react/prop-types */

const Notification = ({ notification }) => {
   // console.log(notification)
    if (notification.message === null) {
      return null
    }
    if(notification.isError) {
    return (
      <div className='error'>
        {notification.message}
      </div>
    )
    }
    else
    {
        return (
            <div className='accept'>
            {notification.message}
            </div>
        )
    }
}

export default Notification