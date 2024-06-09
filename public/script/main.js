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
// function to implement search bar functionality
function searchJob() {
    const searchText = document.getElementById('search').value;
    const mainContainer = document.getElementById('search-container');

    const url = `/jobs/search/${searchText}`;
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
        .then((jobsList) => {
            mainContainer.innerHTML = "";
            let htmlText = "";
            if (jobsList.length == 0) {
                mainContainer.innerHTML = `<div class="alert alert-danger my-5" role="alert">
                Sorry! No Jobs found for entered designation.
                </div>`;
            }
            let containerDiv = document.createElement('div');
            containerDiv.classList.add('container', 'd-flex', 'flex-wrap', 'm-4', 'w-100');
            for (job of jobsList) {
                htmlText += `<div class="card m-2 p-2 bg-secondary-subtle" style="width: 18rem;">
                    <a class="btn btn-primary w-75" href="">Actively hiring
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-graph-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07" />
                        </svg>
                    </a>
                    <div class="card-body">
                        <h4 class="card-title">
                            ${job.companyName}
                        </h4>
                        <h6 class="fs-6">
                            ${job.jobDesignation}
                        </h6>
                        <div class="card-body flex-column">
                            <p class="m-0">
                                <i class="bi bi-geo-alt-fill"></i>
                               ${job.jobLocation}
                            </p>
                            <p class="d-inline-block">
                                <i class="bi bi-currency-rupee"></i>
                                ${job.salary}
                            </p>
                        </div>
                        <div class="d-flex flex-wrap m-2">
                        </div>
                        <a href="/jobs/${job.id}" class="btn btn-primary w-100">View Details</a>
                    </div>
                </div>`
            }
            containerDiv.innerHTML = htmlText;
            mainContainer.appendChild(containerDiv);
        })
        .catch((err) => {
            console.log(err);
        })
}