public class ResponseDto
{
    public int CaseId { get; set; }
    public int DoctorId { get; set; }
    public string Response1 { get; set; } = null!;
    public string? Recommendation { get; set; }
}
