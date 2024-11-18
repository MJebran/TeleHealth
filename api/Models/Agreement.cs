using System.Text.Json.Serialization;


namespace TeleHealthAPI.Models;

public partial class Agreement
{
    public int Id { get; set; }

    public string Version { get; set; } = null!;

    public string AgreementText { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    [JsonIgnore]
    public virtual ICollection<User> Users { get; set; } = new List<User>();

}
