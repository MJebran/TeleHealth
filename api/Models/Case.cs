using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TeleHealthAPI.Models;

public partial class Case
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey("Patient")]
    public int PatientId { get; set; }

    [ForeignKey("Scribe")]
    public int? ScribeId { get; set; }

    [ForeignKey("Doctor")]
    public int? DoctorId { get; set; }

    [Required]
    [MaxLength(100)] // Limit the title length for consistency
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string? Symptoms { get; set; }

    public string? History { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime? CreatedAt { get; set; }

    [ForeignKey("Status")]
    public int? StatusId { get; set; }

    // Navigation Properties
    [JsonIgnore]
    public virtual User? Doctor { get; set; }

    [JsonIgnore]
    public virtual ICollection<File> Files { get; set; } = new List<File>();

    [JsonIgnore]
    [ForeignKey("PatientId")]
    public virtual User? Patient { get; set; } // Make nullable if Patient is optional

    [JsonIgnore]
    public virtual ICollection<Response> Responses { get; set; } = new List<Response>();

    [JsonIgnore]
    public virtual User? Scribe { get; set; }

    [JsonIgnore]
    public virtual Casestatus? Status { get; set; }
}
