using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TeleHealthAPI.Models;

public partial class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Username { get; set; } = null!;

    [Required]
    [MaxLength(255)] // Adjust if hashing results in longer strings
    public string Password { get; set; } = null!;

    [Required]
    [EmailAddress]
    [MaxLength(100)]
    public string Email { get; set; } = null!;

    [MaxLength(100)]
    public string? FullName { get; set; }

    [ForeignKey("Role")]
    public int? RoleId { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime? CreatedAt { get; set; }

    public bool? Verified { get; set; }

    public bool? IsApproved { get; set; }

    [MaxLength(10)]
    public string? Gender { get; set; }

    public bool? HasAcceptedAgreement { get; set; }

    [ForeignKey("Agreement")]
    public int? AgreementId { get; set; }

    // Navigation Properties
    [JsonIgnore]
    public virtual Agreement? Agreement { get; set; }

    [JsonIgnore]
    public virtual ICollection<Case> CaseDoctors { get; set; } = new List<Case>();

    [JsonIgnore]
    public virtual ICollection<Case> CasePatients { get; set; } = new List<Case>();

    [JsonIgnore]
    public virtual ICollection<Case> CaseScribes { get; set; } = new List<Case>();

    [JsonIgnore]
    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    [JsonIgnore]
    public virtual ICollection<Response> Responses { get; set; } = new List<Response>();

    [JsonIgnore]
    public virtual Role? Role { get; set; }
}
