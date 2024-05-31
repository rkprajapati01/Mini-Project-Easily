// function implementation for job deletetion
function deleteJob(id) {
    console.log("inside fetch function");
    const ans = confirm("Do you really want to delete the Job post ?");
    const url = `/jobs/${id}/delete`;
    if (ans) {
        fetch(url, {
            method: 'POST'
        }).then(res => {
            if (res.ok) {
                window.location.href = '/jobs';
            }
        })
    }

}