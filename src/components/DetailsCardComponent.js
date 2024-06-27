import React from 'react'

function DetailsCardComponent({ sn, userN, email }) {
    return (
        <div class="card my-2">
            <div class="card-body">
                <h5>{sn}. Benutzername : {userN} <br /><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>E-Mail Adresse : {email}</h5>

            </div>
        </div>
    )
}

export default DetailsCardComponent