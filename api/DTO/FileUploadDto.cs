using Microsoft.AspNetCore.Mvc;

public class FileUploadDto
{
    [FromForm(Name = "file")]
    public IFormFile File { get; set; }

    [FromForm(Name = "caseId")]
    public int CaseId { get; set; }
}
