// using Microsoft.AspNetCore.Mvc;

// public class FileUploadDto
// {
//     [FromForm(Name = "file")]
//     public required IFormFile File { get; set; }

//     [FromForm(Name = "caseId")]
//     public required int CaseId { get; set; }
// }


using Microsoft.AspNetCore.Mvc;

public class FileUploadDto
{
    [FromForm(Name = "file")]
    public IFormFile File { get; set; }

    [FromForm(Name = "caseId")]
    public int CaseId { get; set; }
}


